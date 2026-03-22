// ai_assistant_settings table doesn't exist in this project — use static defaults

type SettingKey = "daily_minutes_limit" | "minutes_price" | "daily_messages_limit";

interface AssistantSettingsState {
  daily_minutes_limit?: string;
  minutes_price?: string;
  daily_messages_limit?: string;
}

const DEFAULTS: AssistantSettingsState = {
  daily_minutes_limit: "60",
  minutes_price: "1",
  daily_messages_limit: "20",
};

export function useAiAssistantSettings() {
  return {
    values: DEFAULTS,
    updateValue: (_key: SettingKey, _value: string) => {},
    loading: false,
    saving: false,
    error: null,
    success: false,
    form: {
      values: DEFAULTS,
      handleChange: () => {},
      handleSubmit: (e: React.FormEvent) => e.preventDefault(),
    },
  };
}

export function useDailyMessagesLimit() {
  return { limit: 20, loading: false };
}
