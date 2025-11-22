import sharp from "sharp";
import fs from "fs/promises";

async function compressUntilUnderNMB(inputPath, outputPath, n) {
  let quality = 80;
  let buffer = await fs.readFile(inputPath);

  while (quality >= 40) {
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality })
      .toBuffer();

    if (compressedBuffer.length < n * 1024 * 1024) {
      await fs.writeFile(outputPath, compressedBuffer);
      return true;
    }

    quality -= 10;
  }

  return false;
}

export default compressUntilUnderNMB