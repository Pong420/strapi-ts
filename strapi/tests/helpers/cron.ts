import Cronjobs from '@/config/functions/cron';

interface CronOptions {
  advanceTimersByTime: number;
}

export async function cron(job: keyof typeof Cronjobs, options: CronOptions) {
  jest.useFakeTimers('modern');
  jest.advanceTimersByTime(options.advanceTimersByTime);
  const cronJobs = require('../../config/functions/cron');
  await cronJobs[job]();
  jest.useRealTimers();
}
