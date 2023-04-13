import { exec } from 'child_process';
import axios from 'axios';

const runJest = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec('jest', (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const callMockApi = async (data: any): Promise<any> => {
  const response = await axios.post('https://your-mock-api-endpoint.com', data);
  return response.data;
};

(async () => {
  try {
    console.log('Running Jest first time...');
    const jestOutput = await runJest();
    console.log('Jest output:', jestOutput);

    console.log('Calling mock API with Jest output...');
    const apiResponse = await callMockApi({ jestOutput });

    console.log('Received response from mock API:', apiResponse);

    console.log('Running Jest second time...');
    const jestOutput2 = await runJest();
    console.log('Jest output:', jestOutput2);
  } catch (error) {
    console.error('Error:', error);
  }
})();
