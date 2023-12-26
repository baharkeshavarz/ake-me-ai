import { NextResponse } from "next/server";
import fs from "fs";

const CHUNK_SIZE_IN_BYTES = 3000000; // 3mb

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  console.log("videoId", videoId);

  const headersList = req.headers;
  const range = headersList.get("range");
  console.log("req referer", range);
  if (!range) {
    return NextResponse.json({ error: "Rang must be provided" });
  }

  const videoPath = `/videos/${videoId}`;
  console.log("videoPath", videoPath);

  console.log("videoPath", videoPath);
  const videoSizeInBytes = fs.statSync(videoPath).size;
  const chunkStart = Number(range.replace(/\D/g, ""));

  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  );
  const contentLength = chunkEnd - chunkStart + 1;
  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength.toString(),
    "Content-Type": "video/mp4",
  };

  const videoStream = fs.createReadStream(videoPath, {
    start: chunkStart,
    end: chunkEnd,
  });

  // And produce a response with the new headers
  return new Response(videoStream as any, {
    status: 206,
    headers,
  });
}
