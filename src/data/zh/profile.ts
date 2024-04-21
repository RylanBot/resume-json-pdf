import { ProfileData } from '@/types/profile';

const ZH_PROFILE: ProfileData = {
    name: 'Xxx',
    avatar: 'https://s2.loli.net/2024/01/09/fJvOraZGAHyI6wW.png',
    footnote: [
        {
            label: '求职意向',
            content: '前端开发实习生'
        },
        {
            label: '到岗时间',
            content: 'xx 年 x 月'
        }
    ],
    contact: [
        {
            icon: 'fa-solid fa-phone',
            key: '电话',
            value: '139-xxx-xxxxx'
        },
        {
            icon: 'fa-solid fa-envelope',
            key: '邮箱',
            value: 'rylanbot@foxmail.com'
        },
        {
            icon: 'fab fa-weixin',
            key: '微信',
            value: 'xxxxxx'
        },
        {
            icon: 'fa-solid fa-rss',
            key: '博客',
            value: 'https://rylan.cn'
        },
        {
            icon: 'fab fa-github',
            key: '',
            value: 'https://github.com/RylanBot'
        }
    ]
};

export default ZH_PROFILE;