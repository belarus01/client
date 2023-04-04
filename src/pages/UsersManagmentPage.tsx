import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { UsersTable } from '@app/components/users/UsersTable';
import { useTranslation } from 'react-i18next';
const UsersManagmentPage: React.FC = ()=>{
    const {t} = useTranslation();
    return(
        <>
        <Card title='Пользователи'>
            <PageTitle>{'Пользователи'}</PageTitle>
            <UsersTable />
        </Card>
           
        </>
    )
}

export default UsersManagmentPage;