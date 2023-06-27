import { UploadOutlined } from '@ant-design/icons';
import { uploadAndUpdateTnpa, uploadFiles, uploadTnpa } from '@app/api/file.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Upload, message, notification } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import { notificationController } from '@app/controllers/notificationController';
import { FormInstance } from 'antd/es/form/Form';
import { RcFile, UploadFile } from 'antd/es/upload/interface';
import { updateTnpaList } from '@app/api/tnpa.api';
interface CheklistUploadProps {
  titleButton?: string;
  ref: React.ForwardedRef<any | null>;
  onFinish: () => {
    update: boolean;
    fields: ITnpaCategory;
    idList?: string | number | null;
  };
  close?: () => void;
  update?: () => void;
  formInstance: FormInstance;
}

// interface CustomRequestOptions {
//   onSuccess: (response?: any) => void;
//   onError: (error?: any) => void;
//   file: any;
//   onProgress: (progress?: any) => void;
// }

const TnpaUpload: React.FC<CheklistUploadProps> = forwardRef(
  ({ titleButton, children, onFinish, close, update, formInstance }, ref) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState(false);

    const prepareFileForLoading = (values?: ITnpaCategory) => {
      const formData = new FormData();

      formData.append('file', fileList[0] as RcFile);
      if (values) {
        formData.append('tnpa', JSON.stringify(values));
      }
      return formData;
    };

    const handleUpload = async (values: {
      update: boolean;
      fields: ITnpaCategory;
      idList?: string | number | null;
    }) => {
      setLoading(true);
      if (!values.update) {
        if (fileList.length == 0) {
          notificationController.error({ message: 'Ошибка', description: 'Требуется выбрать документ' });
          return;
        }
        const formData = prepareFileForLoading(values.fields);
        uploadTnpa(formData)
          .then(() => {
            setLoading(false);
            notificationController.success({ message: 'Документ загружен успешно!' });
            if (close) {
              close();
            }
          })
          .catch((e) => {
            notificationController.error({ message: 'Ошибка' });
          });
      } else if (values.update) {
        if (fileList.length == 0) {
          if (values.idList) {
            updateTnpaList(values.idList, values.fields)
              .then(() => {
                setLoading(false);
                notificationController.success({ message: 'Документ загружен успешно!' });
                if (close) {
                  close();
                }
              })
              .catch((e) => {
                notificationController.error({ message: 'Ошибка' });
              });
          } else {
            notificationController.error({ message: 'Ошибка', description: 'Нет id документа' });
          }
        } else {
          if (values.idList) {
            const formData = prepareFileForLoading(values.fields);
            uploadAndUpdateTnpa(formData, values.idList)
              .then(() => {
                setLoading(false);
                notificationController.success({ message: 'Документ обнавлен успешно!' });
                if (close) {
                  close();
                }
              })
              .catch((e) => {
                notificationController.error({ message: 'Ошибка' });
              });
          } else {
            notificationController.error({ message: 'Ошибка', description: 'Нет id документа' });
          }
        }
      }
    };

    useImperativeHandle(ref, () => ({
      handleUpload,
    }));

    return (
      <div ref={ref}>
        <BaseButtonsForm.Item>
          <Upload
            fileList={undefined}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);
              return false;
            }}
            maxCount={1}
          >
            {children ? children : <Button icon={<UploadOutlined />}>{titleButton || 'Добавить документ'}</Button>}
          </Upload>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: 16 }}>
            {loading ? 'Загрузка' : 'Сохранить'}
          </Button>
        </BaseButtonsForm.Item>
      </div>
    );
  },
);

export default TnpaUpload;
