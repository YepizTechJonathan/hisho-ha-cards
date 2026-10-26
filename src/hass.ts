// The parts of Home Assistant's frontend `hass` object these cards use.
// (HA does not publish its frontend types as a package; these are the shapes it hands every card.)

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  translation_key?: string | null;
  hidden?: boolean;
  entity_category?: string | null;
  name?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name: string | null;
  name_by_user?: string | null;
  model?: string | null;
  via_device_id?: string | null;
  entry_type?: string | null;
  identifiers?: [string, string][];
  area_id?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, EntityRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  callService(domain: string, service: string, data?: Record<string, any>, target?: Record<string, any>,
              notifyOnError?: boolean, returnResponse?: boolean): Promise<any>;
  callWS<T = any>(msg: Record<string, any>): Promise<T>;
  themes?: { darkMode?: boolean };
  config?: { time_zone?: string };
  user?: { id: string; name: string; is_admin: boolean };
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}
