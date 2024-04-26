import React from "react";
import styles from "./button.module.css";

type props = {
    children: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    outline?: boolean;
    expand?: boolean;
    link?: boolean;
    ghost?: boolean;
    className?: string;
    destructive?: boolean;
    submit?: boolean;
    disabled?: boolean;
	href?: string;
};

export default function Button(props: props) {
    let button_styles = styles.primary;

    if (props.secondary) {
        button_styles += " " + styles.secondary;
    }

    if (props.link) {
        button_styles += " " + styles.link;
    }

    if (props.ghost) {
        button_styles += " " + styles.ghost;
    }

    if (props.destructive) {
        button_styles += " " + styles.destructive;
    }

    if (props.outline) {
        button_styles += " " + styles.outline;
    }

    if (props.expand) {
        button_styles += " " + styles.expand;
    }

    if (props.disabled) {
        button_styles += " " + styles.disabled;
    }

    if (props.className) {
        button_styles += " " + props.className;
    }

    return (
		<div>
			{props.href ?
				<a href={props.href}>
					<button
						className={button_styles}
						onClick={props.onClick}
						type={props.submit ? "submit" : "button"}
					>
						{props.children}
					</button>
				</a>
				:
				<button
					className={button_styles}
					onClick={props.onClick}
					type={props.submit ? "submit" : "button"}
				>
					{props.children}
				</button>
			}
		</div>
    );
}