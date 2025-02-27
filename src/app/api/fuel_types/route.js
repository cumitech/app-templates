import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { FuelTypeRepository } from "../../../data/repositories/fuel-type.repository";
import { FuelTypeUseCase } from "../../../data/usecases/fuel-type.usecase";
import FuelTypeRequestDto from "../../../data/presentation/dtos/fuel-type-request.dto";
import { displayValidationErrors } from "../../../lib/displayValidationErrors";
import authOptions from "../../../lib/options";
import { getServerSession } from "next-auth";

const fuelTypeRepository = new FuelTypeRepository();
const fuelTypeUseCase = new FuelTypeUseCase(fuelTypeRepository);

export async function GET(request) {
  try {
    const fuelTypes = await fuelTypeUseCase.getAll();

    return NextResponse.json(fuelTypes);
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions); //get session info

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized: Please log in to access this resource.",
        success: false,
        data: null,
        validationErrors: [],
      },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const dto = new FuelTypeRequestDto(body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          validationErrors: displayValidationErrors(validationErrors),
          success: false,
          data: null,
          message: "Attention!",
        },
        { status: 400 }
      );
    }

    const fuelTypeResponse = await fuelTypeUseCase.createFuelType({
      ...dto.toData(),
      userId,
    });
    return NextResponse.json(
      {
        data: fuelTypeResponse,
        message: "fuelType created Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      },
      { status: 400 }
    );
  }
}
