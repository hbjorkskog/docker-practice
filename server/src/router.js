// @flow

import express from 'express';
import childProcess from 'child_process';

/**
 * Express router containing task methods.
 */
const router: express$Router<> = express.Router();

router.post('/run', (req, res) => {
  if (
    req.body &&
    typeof req.body == 'object' &&
    typeof req.body.language == 'string' &&
    typeof req.body.source == 'string'
  ) {
    let stdout: string = '';
    let stderr: string = '';
    const process = childProcess.spawn('docker', [
      'run',
      '--rm',
      'node-image',
      'node',
      '-e',
      req.body.source,
    ]);
    process.stdout.on('data', (data: string) => {
      stdout += data;
    });
    process.stderr.on('data', (data: string) => {
      stderr += data;
    });
    process.on('exit', (exitStatus: number) => {
      res.send({ exitStatus: exitStatus, stdout: stdout, stderr: stderr });
    });
  } else res.status(400).send('Missing properties');
});

export default router;