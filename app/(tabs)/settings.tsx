import { ScrollView, View, Text, Pressable, Switch, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useSettings } from '@/hooks/use-settings';
import { AppSettings } from '@/lib/types';

interface SettingItemProps {
  label: string;
  description?: string;
  value?: string | boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

function SettingItem({ label, description, value, onPress, onToggle }: SettingItemProps) {
  const isToggle = typeof value === 'boolean';

  return (
    <Pressable
      onPress={onPress}
      disabled={isToggle}
      style={({ pressed }) => [{ opacity: pressed && !isToggle ? 0.7 : 1 }]}
      className="bg-surface rounded-lg p-4 mb-3 border border-border flex-row items-center justify-between"
    >
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{label}</Text>
        {description && <Text className="text-sm text-muted mt-1">{description}</Text>}
      </View>

      {isToggle ? (
        <Switch
          value={value as boolean}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#D4AF37' }}
          thumbColor={value ? '#FFFFFF' : '#9CA3AF'}
        />
      ) : (
        <Text className="text-sm text-muted">{value}</Text>
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { settings, loading, updateSettings, resetSettings } = useSettings();
  const [showAbout, setShowAbout] = useState(false);

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text className="text-muted mt-4">Carregando configurações...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-6">Configurações</Text>

        {/* Appearance Section */}
        <Text className="text-lg font-semibold text-primary mb-3">Aparência</Text>

        <SettingItem
          label="Tema"
          description={`Atual: ${settings.theme === 'auto' ? 'Automático' : settings.theme === 'light' ? 'Claro' : 'Escuro'}`}
          onPress={() => {
            const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
            const currentIndex = themes.indexOf(settings.theme);
            const nextTheme = themes[(currentIndex + 1) % themes.length];
            updateSettings({ theme: nextTheme });
          }}
        />

        <SettingItem
          label="Tamanho da Fonte"
          description={`Atual: ${settings.fontSize === 'small' ? 'Pequeno' : settings.fontSize === 'normal' ? 'Normal' : 'Grande'}`}
          onPress={() => {
            const sizes: Array<'small' | 'normal' | 'large'> = ['small', 'normal', 'large'];
            const currentIndex = sizes.indexOf(settings.fontSize);
            const nextSize = sizes[(currentIndex + 1) % sizes.length];
            updateSettings({ fontSize: nextSize });
          }}
        />

        {/* Language Section */}
        <Text className="text-lg font-semibold text-primary mb-3 mt-6">Idioma</Text>

        <SettingItem
          label="Idioma"
          description={`Atual: ${settings.language === 'pt-BR' ? 'Português (Brasil)' : settings.language === 'pt-PT' ? 'Português (Portugal)' : 'Latim'}`}
          onPress={() => {
            const languages: Array<'pt-BR' | 'pt-PT' | 'la'> = ['pt-BR', 'pt-PT', 'la'];
            const currentIndex = languages.indexOf(settings.language);
            const nextLanguage = languages[(currentIndex + 1) % languages.length];
            updateSettings({ language: nextLanguage });
          }}
        />

        {/* Notifications Section */}
        <Text className="text-lg font-semibold text-primary mb-3 mt-6">Notificações</Text>

        <SettingItem
          label="Notificações Diárias"
          description="Receber lembrete da liturgia do dia"
          value={settings.notificationsEnabled}
          onToggle={(value) => updateSettings({ notificationsEnabled: value })}
        />

        {settings.notificationsEnabled && (
          <SettingItem
            label="Hora da Notificação"
            description="Horário para receber a notificação"
            value={settings.notificationTime}
            onPress={() => {
              console.log('Open time picker');
            }}
          />
        )}

        {/* About Section */}
        <Text className="text-lg font-semibold text-primary mb-3 mt-6">Sobre</Text>

        <SettingItem
          label="Versão do App"
          value="1.0.0"
        />

        <SettingItem
          label="Sobre o Aplicativo"
          onPress={() => setShowAbout(!showAbout)}
        />

        {showAbout && (
          <View className="bg-surface rounded-lg p-4 mb-3 border border-border">
            <Text className="text-sm text-foreground leading-relaxed">
              Liturgia Diária com IA é um aplicativo que exibe a liturgia católica diária com análises teológicas geradas por inteligência artificial, baseadas na tradição e magistério da Igreja.
            </Text>
          </View>
        )}

        {/* Reset Button */}
        <Pressable
          onPress={resetSettings}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          className="bg-error rounded-lg py-3 px-4 mt-6 mb-8"
        >
          <Text className="text-center text-base font-semibold text-white">
            Restaurar Configurações Padrão
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
