import React from 'react';

import { messageContainer } from "@/helpers/MessageContainer";

import { IconType } from 'react-icons';
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

/**
 * 图标库索引
 */
interface IconLibrary {
    [key: string]: { [key: string]: IconType };
}

const iconLibrary: IconLibrary = {
    'ai': AiIcons,
    'bi': BiIcons,
    'bs': BsIcons,
    'cg': CgIcons,
    'ci': CiIcons,
    'di': DiIcons,
    'fa': { ...FaIcons, ...Fa6Icons },
    'fc': FcIcons,
    'fi': FiIcons,
    'gi': GiIcons,
    'go': GoIcons,
    'gr': GrIcons,
    'hi': { ...HiIcons, ...Hi2Icons },
    'im': ImIcons,
    'io': { ...IoIcons, ...Io5Icons },
    'lia': LiaIcons,
    'lu': LuIcons,
    'md': MdIcons,
    'pi': PiIcons,
    'ri': RiIcons,
    'rx': RxIcons,
    'si': SiIcons,
    'sl': SlIcons,
    'tb': TbIcons,
    'tfi': TfiIcons,
    'ti': TiIcons,
    'vsc': VscIcons,
    'wi': WiIcons,
};

const IconParser = (iconName: string, className?: string): React.ReactElement | null => {

    // 查找大写字母的索引
    const firstUpperCaseIndex = iconName.search(/[A-Z]/);
    const secondUpperCaseIndex = iconName.substring(firstUpperCaseIndex + 1).search(/[A-Z]/);

    // 确定前缀
    const prefixEndIndex = secondUpperCaseIndex !== -1 ? firstUpperCaseIndex + secondUpperCaseIndex + 1 : firstUpperCaseIndex + 1;
    const prefix = iconName.substring(0, prefixEndIndex).toLowerCase();

    const IconComponent = iconLibrary[prefix]?.[iconName];
    if (!IconComponent) {
        messageContainer.info(`${iconName} not found`);
        return null;
    }

    return React.createElement(IconComponent, { className });
};

export default IconParser;