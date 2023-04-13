export interface vid1 {
  meri_admin_prin_vid: string;
  meri_admin_prin_col: string;
}

export interface vid2 {
  meri_admin_pres_vid: string;
  meri_admin_pres_col: number;
}

export interface DataType {
  key: number;
  perech_narush: string;
  vid_prin: vid1[];
  vid_pres: vid2[];
  podg_predpis: string;
  date_predpis: string;
  date_vruch_predpis: string;
  date_ustr_narush: string;
  date_info_naush: string;
  date_meropri_po_control: string;
  result_prov_meropri: string;
  perech_neustr_narush: string;
}



export interface BasicDataType {
  data: DataType[];
}

export const getBasicDataType = (): Promise<BasicDataType> => {
  return new Promise((res) => {
    res({
      data: [
        {
          key: 1,
          perech_narush: 'qwe1111111111111111111111111111111111111111111111111111111111111',
          vid_prin: [
            {
              meri_admin_prin_vid: 'rth',
              meri_admin_prin_col: '12',
            },
            {
              meri_admin_prin_vid: 'dvdd34',
              meri_admin_prin_col: '13',
            }
          ],
          vid_pres: [
            {
              meri_admin_pres_vid: 'qwe',
              meri_admin_pres_col: 14,
            },
            {
              meri_admin_pres_vid: 'asd23',
              meri_admin_pres_col: 14,
            }
          ],
          podg_predpis: 'qweqwdqwdqwd',
          date_predpis: '2022-03-06',
          date_vruch_predpis: '2022-03-06',
          date_ustr_narush: '2022-03-06',
          date_info_naush: '2022-03-06',
          date_meropri_po_control: '2022-03-06',
          result_prov_meropri: 'qwe23d23dsfewf',
          perech_neustr_narush: 'qwe12dcwefbbr',
        }
      ]
    });
  });
};
