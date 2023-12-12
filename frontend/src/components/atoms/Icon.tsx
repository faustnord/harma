export type IconName =
    | 'logo'
    | 'stack'
    | 'archive'
    | 'burger'
    | 'checklist'
    | 'close'
    | 'gear'
    | 'palette'
    | 'pin'
    | 'plus'
    | 'search'
    | 'tag'
    | 'text'
    | 'trash'
    | 'check'
    | 'pin-solid'
    | 'checkbox'
    | 'square'
    | 'unarchive'

type IconType = {
    name: IconName
    color?: string
    size?: '16px' | '18px' | '20px'
    style?: React.CSSProperties
    className?: string
}

export const Icon = ({ name, color = '#888888', size = '20px', style, className }: IconType) => {
    switch (name) {
        case 'archive':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V5.625L4.375 3.125H15.625L16.875 5.625V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M7.3515 11.7266L9.99994 14.375L12.6484 11.7266" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 8.125V14.375" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.125 5.625H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'unarchive':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_603_632)">
                        <path
                            d="M16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V5.625L4.375 3.125H15.625L16.875 5.625V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875Z"
                            stroke={color}
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path d="M12.6484 10.7734L10 8.125L7.35156 10.7734" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 14.375V8.125" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.125 5.625H16.875" stroke={color} stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_603_632">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )

        case 'burger':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.125 10.0001H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.125 5H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.125 15H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'checklist':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.4375 11.1932V4.0625C3.4375 3.89674 3.50335 3.73777 3.62056 3.62056C3.73777 3.50335 3.89674 3.4375 4.0625 3.4375H15.9375C16.1033 3.4375 16.2622 3.50335 16.3794 3.62056C16.4967 3.73777 16.5625 3.89674 16.5625 4.0625V15.9375C16.5625 16.1033 16.4967 16.2622 16.3794 16.3794C16.2622 16.4967 16.1033 16.5625 15.9375 16.5625H10.5966"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M10 11.875L5 16.875L2.5 14.375" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'close':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.625 4.375L4.375 15.625" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.625 15.625L4.375 4.375" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'gear':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 13.75C12.0711 13.75 13.75 12.0711 13.75 10C13.75 7.92893 12.0711 6.25 10 6.25C7.92893 6.25 6.25 7.92893 6.25 10C6.25 12.0711 7.92893 13.75 10 13.75Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.59938 3.4495L8.1252 2.34419C8.04611 2.28469 7.954 2.24484 7.85648 2.22792C7.75896 2.211 7.65882 2.2175 7.5643 2.24688C7.10774 2.38985 6.66478 2.57312 6.24066 2.79452C6.15287 2.84057 6.07728 2.90685 6.02015 2.98787C5.96301 3.06889 5.92596 3.16233 5.91206 3.26049L5.65145 5.08478C5.55212 5.17284 5.45487 5.26442 5.3597 5.35953C5.26456 5.45467 5.17296 5.55195 5.08488 5.65136L5.08484 5.65139L3.26088 5.91223C3.16287 5.92608 3.06957 5.96303 2.98865 6.02002C2.90772 6.07702 2.84151 6.15242 2.79545 6.24003C2.5737 6.66397 2.39008 7.10678 2.24674 7.56323C2.21722 7.65787 2.21063 7.75818 2.22752 7.85587C2.24441 7.95356 2.28429 8.04584 2.34387 8.12508L3.44956 9.59932C3.44158 9.73182 3.43757 9.86535 3.43753 9.9999C3.43753 10.1344 3.44154 10.268 3.44957 10.4006L3.44956 10.4006L2.34425 11.8748C2.28475 11.9539 2.2449 12.046 2.22798 12.1435C2.21106 12.241 2.21756 12.3412 2.24694 12.4357C2.38991 12.8923 2.57318 13.3352 2.79458 13.7593C2.84064 13.8471 2.90691 13.9227 2.98793 13.9799C3.06895 14.037 3.16239 14.074 3.26055 14.088L5.08484 14.3486C5.17289 14.4479 5.26448 14.5451 5.35959 14.6403C5.45473 14.7354 5.552 14.827 5.65142 14.9151L5.65145 14.9152L5.91228 16.7391C5.92614 16.8371 5.96309 16.9304 6.02008 17.0114C6.07707 17.0923 6.15248 17.1585 6.24009 17.2046C6.66403 17.4263 7.10684 17.6099 7.56329 17.7533C7.65793 17.7828 7.75824 17.7894 7.85593 17.7725C7.95362 17.7556 8.0459 17.7157 8.12514 17.6561L9.59938 16.5504C9.73188 16.5584 9.86541 16.5624 9.99995 16.5625C10.1345 16.5625 10.2681 16.5585 10.4006 16.5504L10.4007 16.5504L11.8749 17.6558C11.954 17.7153 12.0461 17.7551 12.1436 17.772C12.2411 17.7889 12.3412 17.7824 12.4358 17.7531C12.8923 17.6101 13.3353 17.4268 13.7594 17.2054C13.8472 17.1594 13.9228 17.0931 13.9799 17.0121C14.0371 16.9311 14.0741 16.8376 14.088 16.7395L14.3486 14.9152C14.448 14.8271 14.5452 14.7355 14.6404 14.6404C14.7355 14.5453 14.8271 14.448 14.9152 14.3486L14.9152 14.3486L16.7392 14.0877C16.8372 14.0739 16.9305 14.0369 17.0114 13.9799C17.0923 13.9229 17.1586 13.8475 17.2046 13.7599C17.4264 13.336 17.61 12.8932 17.7533 12.4367C17.7828 12.3421 17.7894 12.2418 17.7725 12.1441C17.7557 12.0464 17.7158 11.9541 17.6562 11.8749L16.5505 10.4006C16.5585 10.2681 16.5625 10.1346 16.5625 10.0001C16.5625 9.86551 16.5585 9.73195 16.5505 9.59937L16.5505 9.59932L17.6558 8.12514C17.7153 8.04605 17.7552 7.95394 17.7721 7.85642C17.789 7.7589 17.7825 7.65876 17.7531 7.56424C17.6102 7.10767 17.4269 6.66472 17.2055 6.2406C17.1594 6.15281 17.0932 6.07722 17.0121 6.02008C16.9311 5.96295 16.8377 5.9259 16.7395 5.91199L14.9152 5.65139C14.8272 5.55206 14.7356 5.45481 14.6405 5.35964C14.5453 5.2645 14.4481 5.1729 14.3486 5.08482L14.3486 5.08478L14.0878 3.26082C14.0739 3.16281 14.037 3.06951 13.98 2.98858C13.923 2.90766 13.8476 2.84144 13.76 2.79539C13.336 2.57364 12.8932 2.39002 12.4368 2.24668C12.3421 2.21716 12.2418 2.21057 12.1441 2.22746C12.0464 2.24435 11.9542 2.28423 11.8749 2.34381L10.4007 3.4495C10.2682 3.44152 10.1347 3.43751 10.0001 3.43747C9.86557 3.43747 9.73201 3.44148 9.59943 3.4495L9.59938 3.4495Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )

        case 'palette':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.3125 11.6718C17.4421 11.103 17.5051 10.5209 17.5 9.93747C17.4688 5.80466 14.0469 2.46091 9.92191 2.49997C8.15967 2.51856 6.46026 3.15711 5.12184 4.3036C3.78342 5.4501 2.89147 7.0313 2.6025 8.76978C2.31353 10.5083 2.64599 12.293 3.54155 13.8108C4.43711 15.3286 5.83857 16.4826 7.50004 17.0703C7.78266 17.1721 8.08568 17.2042 8.38338 17.1639C8.68107 17.1236 8.96464 17.0121 9.21002 16.8388C9.4554 16.6655 9.65534 16.4355 9.79288 16.1685C9.93041 15.9014 10.0015 15.6051 10 15.3047V15C9.999 14.7535 10.0468 14.5092 10.1407 14.2812C10.2345 14.0533 10.3726 13.8462 10.5469 13.6718C10.7212 13.4975 10.9283 13.3595 11.1563 13.2656C11.3842 13.1717 11.6285 13.1239 11.875 13.125H15.4844C15.9086 13.1252 16.3203 12.9817 16.6523 12.7178C16.9844 12.4538 17.2171 12.0851 17.3125 11.6718V11.6718Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 6.875C10.5178 6.875 10.9375 6.45527 10.9375 5.9375C10.9375 5.41973 10.5178 5 10 5C9.48223 5 9.0625 5.41973 9.0625 5.9375C9.0625 6.45527 9.48223 6.875 10 6.875Z"
                        fill={color}
                    />
                    <path
                        d="M6.48438 8.90625C7.00214 8.90625 7.42188 8.48652 7.42188 7.96875C7.42188 7.45098 7.00214 7.03125 6.48438 7.03125C5.96661 7.03125 5.54688 7.45098 5.54688 7.96875C5.54688 8.48652 5.96661 8.90625 6.48438 8.90625Z"
                        fill={color}
                    />
                    <path
                        d="M6.48438 12.9688C7.00214 12.9688 7.42188 12.549 7.42188 12.0312C7.42188 11.5135 7.00214 11.0938 6.48438 11.0938C5.96661 11.0938 5.54688 11.5135 5.54688 12.0312C5.54688 12.549 5.96661 12.9688 6.48438 12.9688Z"
                        fill={color}
                    />
                    <path
                        d="M13.5156 8.90625C14.0334 8.90625 14.4531 8.48652 14.4531 7.96875C14.4531 7.45098 14.0334 7.03125 13.5156 7.03125C12.9979 7.03125 12.5781 7.45098 12.5781 7.96875C12.5781 8.48652 12.9979 8.90625 13.5156 8.90625Z"
                        fill={color}
                    />
                </svg>
            )

        case 'pin':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.875 13.125L3.75 16.25" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M12.0546 2.32037L7.18741 7.18755C7.18741 7.18755 5.02334 6.10162 2.70303 7.97662C2.63475 8.03187 2.57889 8.10089 2.53908 8.17918C2.49927 8.25747 2.47641 8.34327 2.47198 8.43099C2.46756 8.51871 2.48168 8.60638 2.51341 8.68828C2.54514 8.77018 2.59378 8.84447 2.65615 8.9063L11.078 17.3282C11.1411 17.3923 11.2172 17.4421 11.3013 17.4741C11.3853 17.5062 11.4753 17.5197 11.565 17.5137C11.6548 17.5078 11.7422 17.4826 11.8213 17.4397C11.9004 17.3969 11.9693 17.3376 12.0233 17.2657C12.6796 16.3985 13.7108 14.6016 12.8124 12.8126L17.6796 7.94537C17.7386 7.88721 17.7855 7.81789 17.8176 7.74144C17.8496 7.66499 17.866 7.58294 17.866 7.50005C17.866 7.41717 17.8496 7.33512 17.8176 7.25867C17.7855 7.18222 17.7386 7.1129 17.6796 7.05474L12.9452 2.32037C12.8871 2.26131 12.8177 2.21442 12.7413 2.18241C12.6648 2.1504 12.5828 2.13391 12.4999 2.13391C12.417 2.13391 12.335 2.1504 12.2585 2.18241C12.1821 2.21442 12.1127 2.26131 12.0546 2.32037Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )

        case 'plus':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.125 10H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 3.125V16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'search':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M13.7026 13.7031L17.4996 17.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'stack':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 13.75L10 18.125L17.5 13.75" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 10L10 14.375L17.5 10" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'tag':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.58326 2.0219L3.28213 3.28213L2.0219 9.58326C2.00172 9.68416 2.00677 9.78847 2.03658 9.88695C2.0664 9.98543 2.12007 10.075 2.19282 10.1478L10.3532 18.3081C10.4112 18.3662 10.4801 18.4122 10.556 18.4436C10.6318 18.475 10.7131 18.4912 10.7951 18.4912C10.8772 18.4912 10.9585 18.475 11.0343 18.4436C11.1101 18.4122 11.179 18.3662 11.2371 18.3081L18.3081 11.2371C18.3662 11.179 18.4122 11.1101 18.4436 11.0343C18.475 10.9585 18.4912 10.8772 18.4912 10.7951C18.4912 10.7131 18.475 10.6318 18.4436 10.556C18.4122 10.4801 18.3662 10.4112 18.3081 10.3532L10.1478 2.19282C10.075 2.12007 9.98543 2.0664 9.88695 2.03658C9.78847 2.00677 9.68416 2.00172 9.58326 2.0219V2.0219Z"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.5625 7.5C7.08027 7.5 7.5 7.08027 7.5 6.5625C7.5 6.04473 7.08027 5.625 6.5625 5.625C6.04473 5.625 5.625 6.04473 5.625 6.5625C5.625 7.08027 6.04473 7.5 6.5625 7.5Z"
                        fill={color}
                    />
                </svg>
            )

        case 'text':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.125 5.3125H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.125 8.4375H13.125" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.12549 11.5625H16.875" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.12549 14.6875H13.125" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'trash':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8748 4.375L3.12476 4.375" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.125 8.125V13.125" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.875 8.125V13.125" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M15.625 4.375V16.25C15.625 16.4158 15.5592 16.5747 15.4419 16.6919C15.3247 16.8092 15.1658 16.875 15 16.875H5C4.83424 16.875 4.67527 16.8092 4.55806 16.6919C4.44085 16.5747 4.375 16.4158 4.375 16.25V4.375"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.125 4.375V3.125C13.125 2.79348 12.9933 2.47554 12.7589 2.24112C12.5245 2.0067 12.2065 1.875 11.875 1.875H8.125C7.79348 1.875 7.47554 2.0067 7.24112 2.24112C7.0067 2.47554 6.875 2.79348 6.875 3.125V4.375"
                        stroke={color}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )

        case 'check':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.875 5.62549L8.125 14.3751L3.75 10.0005" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )

        case 'pin-solid':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.125 8.38279L13.5547 12.9531C13.9062 13.9453 14.0547 15.6015 12.5234 17.6406C12.4149 17.7837 12.2774 17.9022 12.1199 17.9884C11.9623 18.0745 11.7884 18.1264 11.6094 18.1406H11.5234C11.1923 18.1392 10.8751 18.0072 10.6406 17.7734L6.875 14.0078L4.19531 16.6953C4.07585 16.8108 3.91617 16.8754 3.75 16.8754C3.58382 16.8754 3.42415 16.8108 3.30468 16.6953C3.18732 16.5768 3.12148 16.4168 3.12148 16.25C3.12148 16.0832 3.18732 15.9232 3.30468 15.8047L5.99218 13.125L2.21093 9.34373C2.0855 9.22014 1.98778 9.07129 1.92424 8.90706C1.86071 8.74283 1.83282 8.56697 1.84243 8.39114C1.85203 8.21531 1.89891 8.04353 1.97995 7.8872C2.06099 7.73087 2.17435 7.59355 2.3125 7.48436C4.29687 5.88279 6.19531 6.20311 7.03125 6.46092L11.6172 1.87498C11.8525 1.6431 12.1696 1.51312 12.5 1.51312C12.8304 1.51312 13.1475 1.6431 13.3828 1.87498L18.125 6.61717C18.2417 6.73268 18.3343 6.87017 18.3975 7.0217C18.4608 7.17323 18.4933 7.33579 18.4933 7.49998C18.4933 7.66417 18.4608 7.82673 18.3975 7.97826C18.3343 8.12979 18.2417 8.26729 18.125 8.38279V8.38279Z"
                        fill={color}
                    />
                </svg>
            )

        case 'checkbox':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1251 6.375L7.87512 11.625L5.25012 9" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="0.6" y="0.6" width="16.8" height="16.8" rx="3.4" stroke={color} strokeWidth="1.2" />
                </svg>
            )

        case 'square':
            return (
                <svg style={style} className={className} width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.6" y="0.6" width="16.8" height="16.8" rx="3.4" stroke={color} strokeWidth="1.2" />
                </svg>
            )

        case 'logo':
            return (
                <svg style={style} className={className} width="107" height="36" viewBox="0 0 107 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M40.352 13.664C38.768 13.664 37.568 14.24 36.92 15.128V9.2H33.32V26H36.92V19.448C36.92 17.744 37.832 16.976 39.152 16.976C40.304 16.976 41.24 17.672 41.24 19.16V26H44.84V18.632C44.84 15.392 42.776 13.664 40.352 13.664ZM56.2642 14V15.128C55.4722 14.216 54.2962 13.664 52.6882 13.664C49.5442 13.664 46.9522 16.424 46.9522 20C46.9522 23.576 49.5442 26.336 52.6882 26.336C54.2962 26.336 55.4722 25.784 56.2642 24.872V26H59.8642V14H56.2642ZM53.4082 22.928C51.7522 22.928 50.5522 21.8 50.5522 20C50.5522 18.2 51.7522 17.072 53.4082 17.072C55.0642 17.072 56.2642 18.2 56.2642 20C56.2642 21.8 55.0642 22.928 53.4082 22.928ZM66.3453 16.136V14H62.7453V26H66.3453V20.576C66.3453 18.2 68.4573 17.6 69.9453 17.84V13.76C68.4333 13.76 66.8253 14.528 66.3453 16.136ZM85.3081 13.664C83.6041 13.664 82.5001 14.288 81.8281 15.248C81.1561 14.24 80.1001 13.664 78.6841 13.664C77.0761 13.664 76.0201 14.288 75.4681 15.104V14H71.8681V26H75.4681V19.232C75.4681 17.816 76.1401 16.976 77.3401 16.976C78.4921 16.976 79.0681 17.744 79.0681 18.944V26H82.6681V19.232C82.6681 17.816 83.3401 16.976 84.5401 16.976C85.6921 16.976 86.2681 17.744 86.2681 18.944V26H89.8681V18.632C89.8681 15.632 88.0681 13.664 85.3081 13.664ZM101.281 14V15.128C100.489 14.216 99.3131 13.664 97.7051 13.664C94.5611 13.664 91.9691 16.424 91.9691 20C91.9691 23.576 94.5611 26.336 97.7051 26.336C99.3131 26.336 100.489 25.784 101.281 24.872V26H104.881V14H101.281ZM98.4251 22.928C96.7691 22.928 95.5691 21.8 95.5691 20C95.5691 18.2 96.7691 17.072 98.4251 17.072C100.081 17.072 101.281 18.2 101.281 20C101.281 21.8 100.081 22.928 98.4251 22.928Z"
                        fill="#555555"
                    />
                    <g clipPath="url(#clip0_75_2215)">
                        <g filter="url(#filter0_f_75_2215)">
                            <path
                                d="M8.5 19.5C8.5 23.366 5.86602 26 2.00002 26C-1.86597 26 -2 22.866 -2 19C-2 15.134 -0.365969 8 3.50002 8C7.36602 8 8.5 15.634 8.5 19.5Z"
                                fill="#E692D3"
                            />
                        </g>
                        <g filter="url(#filter1_f_75_2215)">
                            <path
                                d="M8.25 21.3848C8.25 25.1872 -0.678932 36 -2.75 36C-4.82107 36 -9.75001 24.6872 -9.75001 20.8848C-9.75001 17.0824 2.42893 14.5 4.5 14.5C6.57107 14.5 8.25 17.5824 8.25 21.3848Z"
                                fill="#A88FE0"
                            />
                        </g>
                        <g filter="url(#filter2_f_75_2215)">
                            <circle cx="19" cy="8" r="7" fill="#EAC396" />
                        </g>
                        <g filter="url(#filter3_f_75_2215)">
                            <path
                                d="M29.5 30.4502C29.5 34.3162 26.366 37.4502 22.5 37.4502C18.634 37.4502 6 29.3162 6 25.4502C6 21.5842 18.634 23.4502 22.5 23.4502C26.366 23.4502 29.5 26.5842 29.5 30.4502Z"
                                fill="#A5E99E"
                            />
                        </g>
                        <g filter="url(#filter4_f_75_2215)">
                            <path
                                d="M35.9749 30.5C35.9749 34.366 13.1118 38 9.24585 38C5.37986 38 11.7459 25.366 11.7459 21.5C11.7459 17.634 18.6089 17 22.4749 17C26.3409 17 35.9749 26.634 35.9749 30.5Z"
                                fill="#8EE8D6"
                            />
                        </g>
                        <g filter="url(#filter5_f_75_2215)">
                            <path
                                d="M11 9.00928C11 12.8753 8.86601 20.5093 5.00002 20.5093C1.13403 20.5093 0 9.37527 0 5.50928C0 1.64328 0.134026 2.00928 4.00002 2.00928C7.86601 2.00928 11 5.14328 11 9.00928Z"
                                fill="#EC9E9E"
                            />
                        </g>
                        <g filter="url(#filter6_f_75_2215)">
                            <path
                                d="M18 25.8C18 29.7765 14.866 33 11 33C7.13398 33 5.99996 29.2622 5.99996 25.2857C5.99996 21.3093 7.13401 15 11 15C14.866 15 18 21.8236 18 25.8Z"
                                fill="#91BCE6"
                            />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_f_75_2215" x="-8" y="2" width="22.5" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <filter
                            id="filter1_f_75_2215"
                            x="-15.75"
                            y="8.5"
                            width="30"
                            height="33.5"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <filter id="filter2_f_75_2215" x="6" y="-5" width="26" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <filter id="filter3_f_75_2215" x="0" y="17" width="35.5" height="26.4502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <filter id="filter4_f_75_2215" x="2" y="11" width="39.9749" height="33" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <filter id="filter5_f_75_2215" x="-6" y="-4" width="23" height="30.5093" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <filter
                            id="filter6_f_75_2215"
                            x="-6.10352e-05"
                            y="9"
                            width="24"
                            height="30"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_75_2215" />
                        </filter>
                        <clipPath id="clip0_75_2215">
                            <rect y="6" width="24" height="24" rx="12" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )

        default:
            return <></>
    }
}
