import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import * as CiIcons from 'react-icons/ci';
import * as FiIcons from 'react-icons/fi';
import * as LuIcons from 'react-icons/lu';
import * as SiIcons from 'react-icons/si';

// DynamicIcon.tsx - Load React Icon library dynamically from attributes from Directus

const iconSets = {
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
  gi: GiIcons,
  io: IoIcons,
  ci: CiIcons,
  fi: FiIcons,
  lu: LuIcons,
  si: SiIcons,
};

const DynamicIcon = ({
  name,
  set = 'fa',
  size = 20,
  color = 'currentColor',
  className = '',
}: {
  name: string;
  set: string;
  size: number;
  color: string;
  className: string;
}) => {
  let IconComponent = FaIcons.FaAlignCenter;

  if (name.startsWith('Fa')) {
    IconComponent = iconSets['fa'][name];
  } else if (name.startsWith('Si')) {
    IconComponent = iconSets['si'][name];
  } else {
    IconComponent = iconSets[set][name];
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default DynamicIcon;
