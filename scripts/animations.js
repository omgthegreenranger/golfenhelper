 
export function LoadingPulse() {
    const Pulse = props => {
        const pulseAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

        useEffect(() => {
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 2,
                //          easing: Easing.back(),
                useNativeDriver: true,
            }).start();
        }, [pulseAnim]);

        return (
            <Animated.View // Special animatable View
                style={{
                    ...props.style,
                    opacity: pulseAnim, // Bind opacity to animated value
                }}>
                {props.children}
            </Animated.View>
        );
    };
}