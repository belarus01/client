import { UploadOutlined } from '@ant-design/icons';
import { uploadFiles, uploadTnpa } from '@app/api/file.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Upload, message, notification } from 'antd';
import React, { forwardRef, useState } from 'react';
import { ITnpaCategory } from '../tnpaTables/TnpaTable';
import { notificationController } from '@app/controllers/notificationController';
import { FormInstance } from 'antd/es/form/Form';
interface CheklistUploadProps {
  titleButton?: string;
  ref: React.ForwardedRef<any | null>;
  onFinish: () => {
    update: boolean;
    fields: ITnpaCategory;
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
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (options: any) => {
      const { onSuccess, onError, file, onProgress } = options;
      console.log(file);

      const formData = new FormData();

      formData.append('file', file);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event: ProgressEvent) => {
          console.log(event);

          onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      };
      const error = await formInstance.validateFields();
      console.log(error);

      const value = onFinish();
      console.log(value);

      setLoading(true);
      try {
        if (!value.update) {
          formData.append('tnpa', JSON.stringify(value.fields));
          const { data } = await uploadTnpa(formData, config);

          onSuccess();
          if (update && close) {
            update();
            close();
          }
          setLoading(false);
          return data;
        }
      } catch (err: any) {
        console.dir(err.options);

        notificationController.error({ message: err.message });
        onError({ err });
        setLoading(false);
        return;
      }
    };

    // const handleRemove = (file: { uid: any }) => {
    //   const updatedList = fileList.filter((item) => item.uid !== file.uid);
    //   setFileList(updatedList);
    // };

    // const handleFileChange = ({ fileList }) => {
    //   setFileList(fileList);
    // };

    return (
      <BaseButtonsForm.Item>
        <Upload
          ref={ref}
          customRequest={handleUpload}
          // onRemove={handleRemove}
        >
          {/* {children ? (
            children
          ) : (
            <Button loading={loading} htmlType="submit" icon={<UploadOutlined />}>
              {titleButton || 'Добавить документ'}
            </Button>
          )} */}
        </Upload>
      </BaseButtonsForm.Item>
    );
  },
);

export default TnpaUpload;
