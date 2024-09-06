import { MOCK_ENDPOINT_URL, submitSleepScore } from "../actions";

describe('Mock endpoint', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Returns success on a success submission', async () => {
    // @TODO: DRY up global fetch mock definition?
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ user: { sleepScore: 40 } }),
      }),
    ) as jest.Mock;

    let res;
    try {
      res = await submitSleepScore({ sleepScore: '300' }, 'res=200');
    } catch (error) {
      expect(error).toMatch('error');
    }

    expect(fetch).toHaveBeenCalledWith(
      `${MOCK_ENDPOINT_URL}/post?res=200`,
      {
        method: 'POST',
        body: JSON.stringify({ sleepScore: '300' })
      }
    );

    expect(res).toBe('success');
  });

  it('Throws error on failed submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ user: { sleepScore: 40 } }),
      }),
    ) as jest.Mock;

    let res;
    try {
      res = await submitSleepScore({ sleepScore: '300' }, 'res=500');
    } catch (error) {
      expect(error).toMatch('error');
    }

    expect(fetch).toHaveBeenCalledWith(
      `${MOCK_ENDPOINT_URL}/post?res=500`,
      {
        method: 'POST',
        body: JSON.stringify({ sleepScore: '300' })
      }
    );

    expect(res).toBe('error');
  });
});
