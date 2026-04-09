// components/ui/mobile-wrapper.tsx
import { View, ScrollView, type ViewProps } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/use-settings";

export interface MobileWrapperProps extends ViewProps {
  edges?: Edge[];
  className?: string;
  scrollable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Wrapper otimizado para mobile com:
 * - SafeArea responsivo
 * - Suporte a scroll nativo
 * - Ajuste de fonte baseado nas configurações
 * - Padding adaptativo para diferentes tamanhos de tela
 */
export function MobileWrapper({
  children,
  edges = ["top", "left", "right"],
  className,
  scrollable = true,
  header,
  footer,
  style,
  ...props
}: MobileWrapperProps) {
  const { settings } = useSettings();
  
  // Mapeamento de tamanho de fonte para classes Tailwind
  const fontSizeClasses = {
    small: "text-sm leading-relaxed",
    normal: "text-base leading-relaxed",
    large: "text-lg leading-loose",
  } as const;

  const Content = () => (
    <View className={cn("flex-1 bg-background", className)} {...props}>
      {/* Header fixo no topo (opcional) */}
      {header && (
        <View className="bg-surface border-b border-border px-4 py-3">
          {header}
        </View>
      )}
      
      {/* Conteúdo principal */}
      <View className={cn("flex-1 px-4", fontSizeClasses[settings.fontSize])}>
        {children}
      </View>
      
      {/* Footer fixo na base (opcional) */}
      {footer && (
        <View className="bg-surface border-t border-border px-4 py-3">
          {footer}
        </View>
      )}
    </View>
  );

  if (scrollable) {
    return (
      <SafeAreaView edges={edges} className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Content />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      <Content />
    </SafeAreaView>
  );
}