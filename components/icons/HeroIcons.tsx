
import React from 'react';

const createIcon = (path: React.ReactNode) => {
    const Icon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            {path}
        </svg>
    );
    return Icon;
};

export const TranslateIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />);
export const UserCircleIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />);
export const ChatBubbleLeftRightIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.054 1.054 0 00-1.748 0L9.75 16.5l-3.72-3.72a1.054 1.054 0 00-1.748 0L2.25 15.525V8.511c0-.97 1.519-1.813 2.462-2.097a8.45 8.45 0 016.386.036c.15.034.301.066.452.095a8.45 8.45 0 016.386-.035z" />);
export const ArrowsRightLeftIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-12L21 9m0 0L16.5 4.5M21 9H3" />);
export const SpeakerWaveIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />);
export const DocumentDuplicateIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />);
export const ArrowUpOnSquareIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />);
export const GiftIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a8.25 8.25 0 01-16.5 0v-8.25m16.5 0a8.25 8.25 0 00-16.5 0m16.5 0v-1.5A2.25 2.25 0 0018.75 7.5H5.25A2.25 2.25 0 003 9.75v1.5m16.5 0c.375-1.125-1.253-2.65-3.375-2.65S12 9.25 12 11.25m6.75 0c-.375-1.125.75-2.65 2.625-2.65S21 9.25 21 11.25m-6.75 0c-.375-1.125-1.253-2.65-3.375-2.65S6 9.25 6 11.25m6.75 0c.375-1.125-.75-2.65-2.625-2.65S3 9.25 3 11.25" />);
export const LinkIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />);
export const XMarkIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />);
export const LogoutIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />);
export const LoginIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3h9" />);
export const TrashIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />);
export const SunIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 01-2.25-2.25A2.25 2.25 0 0112 7.5s0 0 0 0a2.25 2.25 0 012.25 2.25A2.25 2.25 0 0112 12z" />);
export const MoonIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.921-.996 6.752-2.698z" />);
export const SparklesIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18.259 15.75L18 14.75l-.259 1.035a3.375 3.375 0 00-2.455 2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456L18 21.75l.259-1.035a3.375 3.375 0 002.456-2.456L21.75 18l-1.035-.259a3.375 3.375 0 00-2.456-2.456z" />);
export const ChartBarIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />);
export const ChartPieIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />);
export const ClockIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />);
export const CurrencyDollarIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.156 0-2.982C10.544 8.219 11.272 8 12 8c.768 0 1.536.219 2.121.659l.879.659m0 0c-1.171.879-3.07.879-4.242 0-1.172-.879-1.172-2.303 0-3.182C10.536 5.219 11.268 5 12 5c.725 0 1.45.22 2.003.659 1.106.826 1.106 2.156 0 2.982C13.456 8.78 12.728 9 12 9c-.768 0-1.536-.219-2.121-.659" />);
export const ChatBubbleOvalLeftIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.534c.445.148.85.348 1.213.586a1.06 1.06 0 01.375 1.414l-2.023 3.498a1.058 1.058 0 01-1.414.375 8.44 8.44 0 00-1.213-.586 8.44 8.44 0 00-4.043 0 8.44 8.44 0 00-1.213.586 1.058 1.058 0 01-1.414-.375l-2.023-3.498a1.06 1.06 0 01.375-1.414 8.432 8.432 0 001.213-.586 8.43 8.43 0 004.043 0 8.43 8.43 0 004.043 0zM4.5 10.534a8.432 8.432 0 011.213-.586 8.43 8.43 0 014.043 0 8.43 8.43 0 014.043 0 8.432 8.432 0 011.213.586m-10.562 3.498a8.428 8.428 0 00-1.213-.586 1.06 1.06 0 00-1.414.375l-2.023 3.498a1.06 1.06 0 00.375 1.414 8.432 8.432 0 001.213.586 8.43 8.43 0 004.043 0 8.43 8.43 0 004.043 0 8.428 8.428 0 001.213-.586 1.058 1.058 0 00.375-1.414l-2.023-3.498a1.058 1.058 0 00-1.414-.375 8.44 8.44 0 01-1.213.586 8.44 8.44 0 01-4.043 0z" />);
export const KeyIcon = createIcon(<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />);

export const StarIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

export const HeartIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const HeartSolidIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.914c-.445-.324-1.686-1.226-2.96-2.267-1.273-1.04-2.555-2.096-3.797-3.268a9.01 9.01 0 01-1.465-3.288c-.18-1.296.256-2.607 1.023-3.488.766-.88 1.842-1.45 2.94-1.45a5.25 5.25 0 013.856 1.573l.908.91.908-.91a5.25 5.25 0 013.856-1.573c1.098 0 2.174.57 2.94 1.45.767.88 1.203 2.192 1.023 3.488a9.01 9.01 0 01-1.465 3.288c-1.242 1.172-2.525 2.228-3.797 3.268-1.273 1.04-2.515 1.943-2.96 2.267a15.247 15.247 0 01-1.344.914l-.022.012-.007.003z" />
    </svg>
);
