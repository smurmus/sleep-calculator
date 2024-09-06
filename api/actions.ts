export const MOCK_ENDPOINT_URL = 'https://af665b3c-3e49-4c53-a477-475e964cc496.mock.pstmn.io';

export const submitSleepScore = async (data?: Record<string, string>, args?: string) => {
  try {
    const response = await fetch(
      `${MOCK_ENDPOINT_URL}/post?${args}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return { state: 'success'};
  } catch (e) {
    return { state: 'error' };
  }
};
