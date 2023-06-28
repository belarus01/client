import { UploadOutlined } from '@ant-design/icons';
import { uploadFiles } from '@app/api/file.api';
import { Button } from '@app/components/common/buttons/Button/Button';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Upload, message } from 'antd';
import React, { useState } from 'react';

interface CheklistUploadProps {
  titleButton?: string;
  idEventOrder: string | number;
  idList: string | number;
}

const CheklistUpload: React.FC<CheklistUploadProps> = ({ titleButton, idEventOrder, idList }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (options: {
    onSuccess: () => void;
    onError: (options: any) => void;
    file: any;
    onProgress: (event: any) => void;
  }) => {
    const { onSuccess, onError, file, onProgress } = options;
    console.log(file);

    const formData = new FormData();

    formData.append('image', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event: ProgressEvent) => {
        console.log(event);

        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {
      const { data } = await uploadFiles(formData, idList, idEventOrder, config);

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
      {/* <Upload {...props}> */}
      <Upload multiple customRequest={handleUpload} onRemove={handleRemove}>
        <Button icon={<UploadOutlined />}>{titleButton || 'Добавить файл'}</Button>
      </Upload>
    </BaseButtonsForm.Item>
  );
};

export default CheklistUpload;
