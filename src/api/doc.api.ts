import { notificationController } from '@app/controllers/notificationController';
import { httpApi } from './http.api';
import { AxiosRequestConfig } from 'axios';

const downLoadWordDocGenerated = (response: { data: BlobPart }, fileName?: string) => {
  console.log('response', response);

  const file = new Blob([response.data], { type: 'application/octet-stream' }); // Создаем Blob объект из полученных данных
  console.log('file', file);

  const url = window.URL.createObjectURL(file); // Создаем URL для Blob объекта
  console.log(url, 'url');

  // window.open(url); // Открываем файл в новой вкладке браузера

  // Или, если вы хотите скачать файл, вы можете использовать следующий код:
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName || 'doc'}.docx`;
  link.click();

  return response.data; // Возвращаем данные (необязательно)
};

const initError = (error: any) => {
  notificationController.error({ type: 'error', message: 'Документ не был создан' });
  console.error(error);
};

const headers: AxiosRequestConfig = {
  responseType: 'blob',
  headers: {
    'Content-Type': 'application/octet-stream', // Устанавливает тип контента для запроса
    Accept: 'application/octet-stream', // Указывает, какой тип контента ожидается в ответе
    // 'Content-Type': 'application/json', // Устанавливаем тип контента в 'application/json'
    // Accept: 'application/octet-stream', // Устанавливаем заголовок Accept для указания ожидаемого типа данных
  },
};

//REQUESTS

export const generateDoc1 = (dto: any) =>
  httpApi
    .post<any>('doc-generation/gen1', { ...dto }, { ...headers })
    .then((response) => downLoadWordDocGenerated(response, `Уведомление№${dto.numDoc || ''}`))
    .catch((error) => initError(error));

export const generateCertificateOfRefusalOfAdmission = (dto: any) =>
  httpApi
    .post<any>('doc-generation/gen5', { ...dto }, { ...headers })
    .then((response) => downLoadWordDocGenerated(response, `Акт№${dto.numDoc || ''}`))
    .catch((error) => initError(error));
