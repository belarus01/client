interface SubjectNavItem {
    id: number;
    name: string;
    href: string;
  }
  
  export const subjectNavData: SubjectNavItem[] = [
    {
      id: 1,
      name: 'Информация',
      href: 'subject-info',
    },
    {
      id: 2,
      name: 'Мероприятия',
      href: 'events',
    },
    {
      id: 3,
      name: 'Объекты',
      href: 'objects',
    },
  ];
  