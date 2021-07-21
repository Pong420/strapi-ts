import childProcess from 'child_process';

export function spawn(command: string, args: string[]) {
  const isWindows = process.platform === 'win32';
  const result = childProcess.spawnSync(
    isWindows ? command + '.cmd' : command,
    args,
    { stdio: 'inherit' }
  );

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`Error while checking: ${command} ${args.join(' ')}`);
    process.exit(1);
  }
}
