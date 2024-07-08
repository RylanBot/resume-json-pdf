import { ProfileData } from '@/types/profile';

const ZH_PROFILE: ProfileData = {
  name: '罗武',
  avatar: 'https://s2.loli.net/2024/01/09/fJvOraZGAHyI6wW.png',
  footnote: [
    {
      label: '求职意向',
      content: '前端、rust开发',
    },
    // {
    //   label: '到岗时间',
    //   content: '2024 年 x 月',
    // },
  ],
  contact: [
    {
      icon: 'PiPhoneCallFill',
      key: '电话',
      value: '15576706916',
    },
    {
      icon: 'HiOutlineMail',
      key: '邮箱',
      value: '1542844298@qq.com',
    },
    {
      icon: 'PiWechatLogoBold',
      key: '微信',
      value: 'bj15576706916',
    },
    {
      icon: 'MdRssFeed',
      key: '博客',
      value: 'https://zuiyu1998.github.io/',
    },
    {
      icon: 'BiLogoGithub',
      key: '',
      value: 'https://github.com/zuiyu1998',
    },
  ],
};

export default ZH_PROFILE;
