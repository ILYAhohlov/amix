import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface LanguageOption {
  code: string;
  name: string;
}

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  
  const languages: LanguageOption[] = [
    { code: 'en', name: t('language.en') },
    { code: 'vi', name: t('language.vi') },
    { code: 'ru', name: t('language.ru') },
    { code: 'fr', name: t('language.fr') },
    { code: 'de', name: t('language.de') },
    { code: 'pt', name: t('language.pt') }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-sm font-medium"
          >
            <Globe className="h-4 w-4 mr-1" />
            {currentLanguage.name}
            <ChevronDown className="h-3 w-3 ml-1 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                language.code === i18n.language ? "bg-accent/10" : ""
              )}
            >
              {language.name}
              {language.code === i18n.language && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}