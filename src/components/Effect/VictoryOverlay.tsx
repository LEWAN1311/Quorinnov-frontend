import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { useCallback, useEffect, useState } from "react";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { Player } from "../../@types/player";

type VictoryOverlayProps = {
    players: {P1: Player, P2: Player};
};

const VictoryOverlay: React.FC<VictoryOverlayProps> = ({ players }) => {
    const [showFireworks, setShowFireworks] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFireworks(false);
        }, 3000); // 30 seconds
        return () => clearTimeout(timer);
    }, []);

    const particlesInit = useCallback(async (engine: any) => {
        await loadFireworksPreset(engine);
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            {
                showFireworks &&
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        preset: "fireworks",
                        fullScreen: false,
                    }}
                    style={{ position: "absolute", inset: 0 }}
                />
            }

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: "fixed"
                }}
            >
                <Typography
                    variant="h2"
                    color="yellow"
                    fontWeight="bold"
                    sx={{
                        textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                    }}>
                    {players.P1.isWinner ? "Vous avez gagné!" : "L'IA a gagné!"}
                </Typography>
            </motion.div>
        </Box>
    );
};

export default VictoryOverlay;
