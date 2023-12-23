import 'dotenv/config'

interface envSchema  {
    readonly TG_BOT_TOKEN: string;
    readonly PRIVATE_KEY:string;

    readonly PATH?: string;
    readonly XAUTHORITY?: string;
    readonly INVOCATION_ID?: string;
    readonly XMODIFIERS?: string;
    readonly XDG_DATA_DIRS?: string;
    readonly GDMSESSION?: string;
    readonly QT_IM_MODULE?: string;
    readonly GTK_IM_MODULE?: string;
    readonly XDG_CONFIG_DIRS?: string;
    readonly LANG?: string;
    readonly DBUS_SESSION_BUS_ADDRESS?: string;
    readonly XDG_SESSION_TYPE?: string;
    readonly XDG_CURRENT_DESKTOP?: string;
    readonly DISPLAY?: string;
    readonly JOURNAL_STREAM?: string;
    readonly SESSION_MANAGER?: string;
    readonly USERNAME?: string;
    readonly LOGNAME?: string;
    readonly PWD?: string;
    readonly MANAGERPID?: string;
    readonly XDG_SESSION_CLASS?: string;
    readonly LANGUAGE?: string;
    readonly GJS_DEBUG_TOPICS?: string;
    readonly SHELL?: string;
    readonly GIO_LAUNCHED_DESKTOP_FILE?: string;
    readonly GPG_AGENT_INFO?: string;
    readonly DESKTOP_SESSION?: string;
    readonly USER?: string;
    readonly XDG_MENU_PREFIX?: string;
    readonly GIO_LAUNCHED_DESKTOP_FILE_PID?: string;
    readonly QT_ACCESSIBILITY?: string;
    readonly WINDOWPATH?: string;
    readonly GJS_DEBUG_OUTPUT?: string;
    readonly GNOME_DESKTOP_SESSION_ID?: string;
    readonly SSH_AUTH_SOCK?: string;
    readonly GTK_MODULES?: string;
    readonly GNOME_SHELL_SESSION_MODE?: string;
    readonly SYSTEMD_EXEC_PID?: string;
    readonly XDG_SESSION_DESKTOP?: string;
    readonly XDG_RUNTIME_DIR?: string;
    readonly SSH_AGENT_LAUNCHER?: string;
    readonly HOME?: string;
    readonly SHLVL?: string;
    [p: string]: string
}

export const env:envSchema = process.env;