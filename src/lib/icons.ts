import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  BellRing,
  Box,
  BrainCircuit,
  Building2,
  Calendar,
  Camera,
  Car,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Code,
  ExternalLink,
  Eye,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  LayoutTemplate,
  Lightbulb,
  Link as LinkIcon,
  LoaderCircle,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Minus,
  PenTool,
  Phone,
  Play,
  Plus,
  Rocket,
  ScanSearch,
  Send,
  ShieldCheck,
  ShoppingCart,
  Signal,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Users,
  Volume2,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';

/**
 * Icônes Lucide utilisées par les contenus (§ 7.3, § 8.8, § 9.3, § 9.4).
 * Les contenus JSON référencent une icône par sa clé ; ce registre permet de
 * les résoudre sans importer toute la bibliothèque côté client.
 */
export const icons = {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  BellRing,
  Box,
  BrainCircuit,
  Building2,
  Calendar,
  Camera,
  Car,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Code,
  ExternalLink,
  Eye,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  LayoutTemplate,
  Lightbulb,
  Link: LinkIcon,
  LoaderCircle,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Minus,
  PenTool,
  Phone,
  Play,
  Plus,
  Rocket,
  ScanSearch,
  Send,
  ShieldCheck,
  ShoppingCart,
  Signal,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Users,
  Volume2,
  Wifi,
  X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Résout une clé d'icône de contenu ; retombe sur Sparkles si elle est inconnue. */
export function getIcon(name: string | undefined): LucideIcon {
  if (name && name in icons) return icons[name as IconName];
  return Sparkles;
}

/**
 * Icônes des réseaux sociaux (§ 10.1). Le cahier des charges impose
 * react-icons pour rester cohérent avec les composants d'inspiration.
 */
export const socialIcons: Record<string, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
};

export function getSocialIcon(name: string): IconType {
  return socialIcons[name] ?? FaInstagram;
}
