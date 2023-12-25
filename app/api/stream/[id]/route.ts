import { API_URL } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log(`searchParams>>>: ${searchParams}`)
  console.log(`id>>>: ${searchParams}`)

  if (!id || Array.isArray(id)) {
    return NextResponse.json({ "error": 'Invalid video ID' });
  }

  console.log(`id: ${id}`)
  // Fetch video information from your API or database
  const videoInfo = await fetch(`${API_URL}/download/${id}`).then((response) => response.json() );  
  if (!videoInfo) {
    return NextResponse.json({ "error": 'Video not found' });
  }

  // const filePath = videoInfo.url; // Update this with the correct property from your API response
  // const stat = fs.statSync(filePath);
  // const fileSize = stat.size;

  // const range = req.headers.range;
  // if (!range) {
  //   return  NextResponse.json({ "error": 'Range header missing' });
  // }

  // const [start, end] = range.replace(/bytes=/, '').split('-');
  // const chunkStart = parseInt(start, 10) || 0;
  // const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, fileSize - 1);

  // const contentLength = chunkEnd - chunkStart + 1;

  // const headers = {
  //   'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
  //   'Accept-Ranges': 'bytes',
  //   'Content-Length': contentLength.toString(),
  //   'Content-Type': 'video/mp4',
  // };

  // res.writeHead(206, headers);

  // const videoStream = fs.createReadStream(filePath, { start: chunkStart, end: chunkEnd });
  // videoStream.pipe(res);
}

