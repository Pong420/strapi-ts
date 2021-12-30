interface CronOptions {
  advanceTimersByTime: number;
}

export async function cron(job: string, options: CronOptions) {
  jest.useFakeTimers('modern');
  jest.advanceTimersByTime(options.advanceTimersByTime);
  const cronJobs = require('../../config/functions/cron');
  await cronJobs[job]();
  jest.useRealTimers();
}
