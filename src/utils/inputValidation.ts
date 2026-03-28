export function validateTriageInputs(inputs: { audio?: any; images?: any[]; pdf?: any }): boolean {
  const { audio, images, pdf } = inputs;
  const hasImages = Array.isArray(images) && images.length > 0;
  if (!audio && !hasImages) return false;
  if (Array.isArray(images) && images.length > 3) {
    images.length = 3; 
  }
  return true;
}
