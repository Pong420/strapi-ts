import { spawn as _spawn } from './spawn';

const DockerImageTagName = 'strapi-ts';

const [, , type] = process.argv;

const spawn = (_command: string) => {
  const [command, ...args] = _command.trim().split(' ');
  return _spawn(command, args);
};

function run() {
  switch (type) {
    case 'build':
      spawn('docker build -t ${DockerImageTagName} .');
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
