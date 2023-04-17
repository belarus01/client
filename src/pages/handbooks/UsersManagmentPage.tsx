import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { UsersTable } from '@app/components/users/UsersTable';
const UsersManagmentPage: React.FC = ()=>{
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