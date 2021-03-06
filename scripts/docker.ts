import { spawn as _spawn } from './spawn';

const DockerImageTagName = 'strapi-ts';

const [, , type] = process.argv;

const spawn = (_command: string) => {
  const [command, ...args] = _command.trim().split(' ');
  return _spawn(command, args);
};

function env(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
}

function run() {
  switch (type) {
    case 'build':
      {
        const buildArgs = ['SERVER_URL']
          .map(k => `--build-arg ${k}=${env(k)}`)
          .join(' ');
        spawn(`docker build -t ${DockerImageTagName} ${buildArgs} .`);
      }
      break;
    case 'sh':
      return spawn(`docker run -it ${DockerImageTagName} sh`);
    case 'run':
      return _spawn('docker', [
        'run',
        '-it',
        '-p',
        '1337:1337',
        ...process.argv.slice(3),
        DockerImageTagName
      ]);
  }
}

run();
