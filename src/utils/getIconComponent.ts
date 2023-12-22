import React from 'react';

import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as CiIcons from 'react-icons/ci';
import * as DiIcons from 'react-icons/di';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as FcIcons from 'react-icons/fc';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as Hi2Icons from 'react-icons/hi2';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as LiaIcons from 'react-icons/lia';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as PiIcons from 'react-icons/pi';
import * as RiIcons from 'react-icons/ri';
import * as RxIcons from 'react-icons/rx';
import * as SiIcons from 'react-icons/si';
import * as SlIcons from 'react-icons/sl';
import * as TbIcons from 'react-icons/tb';
import * as TfiIcons from 'react-icons/tfi';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as WiIcons from 'react-icons/wi';

const getIconComponent = (iconName: string, className?: string): React.ReactElement | null => {

    // 查找大写字母的索引
    const firstUpperCaseIndex = iconName.search(/[A-Z]/);
    const secondUpperCaseIndex = iconName.substring(firstUpperCaseIndex + 1).search(/[A-Z]/);

    // 确定前缀
    const prefixEndIndex = secondUpperCaseIndex !== -1 ? firstUpperCaseIndex + secondUpperCaseIndex + 1 : firstUpperCaseIndex + 1;
    const prefix = iconName.substring(0, prefixEndIndex).toLowerCase();

    // 处理同一个库不同系列
    const iconPart = iconName.substring(firstUpperCaseIndex);

    let IconComponent;

    switch (prefix) {
        case 'ai':
            IconComponent = AiIcons[iconName as keyof typeof AiIcons];
            break;
        case 'bi':
            IconComponent = BiIcons[iconName as keyof typeof BiIcons];
            break;
        case 'bs':
            IconComponent = BsIcons[iconName as keyof typeof BsIcons];
            break;
        case 'cg':
            IconComponent = CgIcons[iconName as keyof typeof CgIcons];
            break;
        case 'ci':
            IconComponent = CiIcons[iconName as keyof typeof CiIcons];
            break;
        case 'di':
            IconComponent = DiIcons[iconName as keyof typeof DiIcons];
            break;
        case 'fa':
            IconComponent = iconPart in Fa6Icons ? Fa6Icons[iconPart as keyof typeof Fa6Icons] : FaIcons[iconPart as keyof typeof FaIcons];
            break;
        case 'fc':
            IconComponent = FcIcons[iconName as keyof typeof FcIcons];
            break;
        case 'fi':
            IconComponent = FiIcons[iconName as keyof typeof FiIcons];
            break;
        case 'gi':
            IconComponent = GiIcons[iconName as keyof typeof GiIcons];
            break;
        case 'go':
            IconComponent = GoIcons[iconName as keyof typeof GoIcons];
            break;
        case 'gr':
            IconComponent = GrIcons[iconName as keyof typeof GrIcons];
            break;
        case 'hi':
            IconComponent = iconPart in Hi2Icons ? Hi2Icons[iconPart as keyof typeof Hi2Icons] : HiIcons[iconPart as keyof typeof HiIcons];
            break;
        case 'im':
            IconComponent = ImIcons[iconName as keyof typeof ImIcons];
            break;
        case 'io':
            IconComponent = iconPart in Io5Icons ? Io5Icons[iconPart as keyof typeof Io5Icons] : IoIcons[iconPart as keyof typeof IoIcons];
            break;
        case 'lia':
            IconComponent = LiaIcons[iconName as keyof typeof LiaIcons];
            break;
        case 'lu':
            IconComponent = LuIcons[iconName as keyof typeof LuIcons];
            break;
        case 'md':
            IconComponent = MdIcons[iconName as keyof typeof MdIcons];
            break;
        case 'pi':
            IconComponent = PiIcons[iconName as keyof typeof PiIcons];
            break;
        case 'ri':
            IconComponent = RiIcons[iconName as keyof typeof RiIcons];
            break;
        case 'rx':
            IconComponent = RxIcons[iconName as keyof typeof RxIcons];
            break;
        case 'si':
            IconComponent = SiIcons[iconName as keyof typeof SiIcons];
            break;
        case 'sl':
            IconComponent = SlIcons[iconName as keyof typeof SlIcons];
            break;
        case 'tb':
            IconComponent = TbIcons[iconName as keyof typeof TbIcons];
            break;
        case 'tfi':
            IconComponent = TfiIcons[iconName as keyof typeof TfiIcons];
            break;
        case 'ti':
            IconComponent = TiIcons[iconName as keyof typeof TiIcons];
            break;
        case 'vsc':
            IconComponent = VscIcons[iconName as keyof typeof VscIcons];
            break;
        case 'wi':
            IconComponent = WiIcons[iconName as keyof typeof WiIcons];
            break;
        default:
            return null;
    }

    return React.createElement(IconComponent, { className });
};

export default getIconComponent;