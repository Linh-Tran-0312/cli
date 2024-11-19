import * as fs from 'fs';

const logDir = 'src/logs';

const getLogContent = (content: string) => {
    return '------'  +'Date: ' + new Date() + '-------------------' + '\n' + '\t' + content + '\n' + '\n';
}
export const logger = {
  info(filename: string, content: string) {
    fs.appendFile(`${logDir}/${filename}.info`, getLogContent(content), (err) => {
      if (err) console.log(err);
    });
  },
  json(filename: string, content: any) {
    fs.writeFile(`${logDir}/${filename}.json`,JSON.stringify(content,null,2) , (err) => {
      if (err) console.log(err);
    });
  },
  error(filename: string, content: any)  {
    fs.appendFile(`${logDir}/${filename}.error`, getLogContent(content), (err) => {
      if (err) console.log(err);
    });
  }
}