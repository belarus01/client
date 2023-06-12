import { UploadOutlined } from '@ant-design/icons';
import { uploadFiles } from '@app/api/file.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Upload, message } from 'antd';
import React, { useState } from 'react';

interface CheklistUploadProps {
  titleButton?: string;
}

interface CustomRequestOptions {
  onSuccess: (response?: any) => void;
  onError: (error?: any) => void;
  file: any;
  onProgress: (progress?: any) => void;
}

const TnpaUpload: React.FC<CheklistUploadProps> = ({ titleButton }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (options: CustomRequestOptions) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log(file);

    const formData = new FormData();

    formData.append('mediafile', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event: ProgressEvent) => {
        console.log(event);

        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {
      const { data } = await uploadFiles(formData, config);

      onSuccess();

      return data;
    } catch (err) {
      onError({ err });
    }
  };

  const handleRemove = (file: { uid: any }) => {
    const updatedList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedList);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <BaseButtonsForm.Item>
      <Upload multiple customRequest={handleUpload} onRemove={handleRemove}>
        <Button icon={<UploadOutlined />}>{titleButton || 'Добавить документ'}</Button>
      </Upload>
    </BaseButtonsForm.Item>
  );
};

export default TnpaUpload;
