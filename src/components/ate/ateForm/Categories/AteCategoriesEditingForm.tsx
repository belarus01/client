import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { IAteCategory } from '../../ateTable/AteCategoriesTable';
import { IAteAddingFormProps } from '../../../../domain/interfaces';

interface IEditAteCategoriesProps extends IAteAddingFormProps {
  data: IAteCategory;
  update?: (value: IAteCategory) => void;
}

const AteCategoriesEditingForm: React.FC<IEditAteCategoriesProps> = ({ onCancel, open, data }) => {
  const [category, setCategory] = useState<IAteCategory>({
    ...data,
  });

  const submit = () => {
    // post, body newCategory
    //update()
    console.log('submit');
  };

  return (
    <Modal
      closable
      footer={null}
      onCancel={onCancel}
      destroyOnClose
      title={'Редактирование категории'}
      centered
      open={open}
    >
      <form>
        <div>наименование категории</div>
        <Input
          value={category.nameCateg}
          onChange={(e) => setCategory({ ...category, nameCateg: (category.nameCateg = e.target.value) })}
        />
        <div>сокращенное наименование</div>
        <Input
          value={category.nameShort}
          onChange={(e) => setCategory({ ...category, nameShort: (category.nameShort = e.target.value) })}
        />
      </form>
      <Button
        style={{ marginTop: '10px' }}
        onClick={() => {
          submit();
        }}
      >
        Сохранить
      </Button>
    </Modal>
  );
};

export default AteCategoriesEditingForm;
