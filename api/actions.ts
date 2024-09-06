export const MOCK_ENDPOINT_URL = 'https://af665b3c-3e49-4c53-a477-475e964cc496.mock.pstmn.io';

interface SleepScoreData {
  sleepScore: string;
}

export const submitSleepScore = async (data: SleepScoreData, args?: string) => {
  try {
    // ensure args are optional
    const url = args ? `${MOCK_ENDPOINT_URL}/post?${args}` : `${MOCK_ENDPOINT_URL}/post`;

    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Explicit content type
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return { state: 'success', result };  
  } catch (e) {
    return { 
      state: 'error',
      message: e instanceof Error ? e.message : 'Unknown error'
    };
  }
};
