import { MediaMapper } from "../../../data/presentation/mappers/mapper";
import { MediaRepository } from "../../../data/repositories/media.repository";
import { MediaUseCase } from "../../../data/usecases/media.usecase";
// import { File } from "buffer";
import { validate } from "class-validator";
// import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
// import path from "path";
import MediaRequestDto from "../../../data/presentation/dtos/media-request.dto";

const mediaRepository = new MediaRepository();
const mediaUseCase = new MediaUseCase(mediaRepository);
const mediaMapper = new MediaMapper();

export async function GET(requestd) {
  try {
    const medias = await mediaUseCase.getAll();

    return NextResponse.json(medias);
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
  const data = await request.json();
  const imageUrl = data.imageUrl[0].name;
  const dto = new MediaRequestDto({
    title: data.title,
    carId: data.carId,
    imageUrl,
  });

  const validationErrors = await validate(dto);
  if (validationErrors.length > 0) {
    return NextResponse.json(
      {
        validationErrors,
        success: false,
        data: null,
        message: "Title or file missing!",
      },
      { status: 400 }
    );
  }

  try {
    const mediaResponse = await mediaUseCase.createMedia(dto.toData());

    return NextResponse.json(
      {
        data: mediaMapper.toDTO(mediaResponse),
        message: "media created Successfully!",
        validationErrors: [],
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      {
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      },
      { status: 500 }
    );
  }
}
