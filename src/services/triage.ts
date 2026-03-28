export function parseTriageResponse(jsonStr: string) {
  try {
    const data = JSON.parse(jsonStr);
    if (data.confidence === undefined) data.confidence = 0.5;
    if (data.confidence < 0.6) {
      data.flags = data.flags || [];
      if (!data.flags.includes('low-confidence')) data.flags.push('low-confidence');
    }
    return data;
  } catch (e) {
    return { error: 'Parse Error' };
  }
}