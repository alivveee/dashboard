import {
  LayoutDashboard,
  Users,
  Package,
  Menu,
  Sun,
  Moon,
  Settings,
  ChevronDown,
  Circle,
  LogOut,
  User,
  Lock,
  Eye,
  EyeOff,
  Target,
  Contact,
  BarChart3,
  UserCog,
  KeyRound,
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface IconProps {
  className?: string;
}

export const IconDashboard = ({ className }: IconProps) => (
  <LayoutDashboard size={18} className={className} />
);

export const IconUsers = ({ className }: IconProps) => (
  <Users size={18} className={className} />
);

export const IconProducts = ({ className }: IconProps) => (
  <Package size={18} className={className} />
);

export const IconMenu = ({ className }: IconProps) => (
  <Menu size={20} className={className} />
);

export const IconSettings = ({ className }: IconProps) => (
  <Settings size={18} className={className} />
);

export const IconChevronDown = ({ className }: IconProps) => (
  <ChevronDown size={14} className={className} />
);

export const IconDot = ({ className }: IconProps) => (
  <Circle size={8} className={className} fill="currentColor" />
);

export const IconMoon = ({ className }: IconProps) => (
  <Moon size={18} className={className} />
);

export const IconSun = ({ className }: IconProps) => (
  <Sun size={18} className={className} />
);

export const IconLogOut = ({ className }: IconProps) => (
  <LogOut size={18} className={className} />
);

export const IconUser = ({ className }: IconProps) => (
  <User size={18} className={className} />
);

export const IconLock = ({ className }: IconProps) => (
  <Lock size={18} className={className} />
);

export const IconEye = ({ className }: IconProps) => (
  <Eye size={18} className={className} />
);

export const IconEyeOff = ({ className }: IconProps) => (
  <EyeOff size={18} className={className} />
);

export const IconProspect = ({ className }: IconProps) => (
  <Target size={18} className={className} />
);

export const IconCustomer = ({ className }: IconProps) => (
  <Contact size={18} className={className} />
);

export const IconAnalytics = ({ className }: IconProps) => (
  <BarChart3 size={18} className={className} />
);

export const IconRoles = ({ className }: IconProps) => (
  <UserCog size={18} className={className} />
);

export const IconPermissions = ({ className }: IconProps) => (
  <KeyRound size={18} className={className} />
);

export const IconPlus = ({ className }: IconProps) => (
  <Plus size={18} className={className} />
);

export const IconEdit = ({ className }: IconProps) => (
  <Pencil size={16} className={className} />
);

export const IconTrash = ({ className }: IconProps) => (
  <Trash2 size={16} className={className} />
);

export const IconClose = ({ className }: IconProps) => (
  <X size={18} className={className} />
);

export const IconSortAsc = ({ className }: IconProps) => (
  <ArrowUp size={14} className={className} />
);

export const IconSortDesc = ({ className }: IconProps) => (
  <ArrowDown size={14} className={className} />
);

export const IconSort = ({ className }: IconProps) => (
  <ArrowUpDown size={14} className={className} />
);

export const IconChevronLeft = ({ className }: IconProps) => (
  <ChevronLeft size={16} className={className} />
);

export const IconChevronRight = ({ className }: IconProps) => (
  <ChevronRight size={16} className={className} />
);
