import React from "react";
import styles from "./button.module.css";

type props = {
    children: React.ReactNode;
    onClick?: () => void;
    next?: boolean;
    queue?: boolean;
    ghost?: boolean;
    outline?: boolean;
    expand?: boolean;
    dashed?: boolean;
    className?: string;
    destructive?: boolean;
    submit?: boolean;
    disabled?: boolean;
	href?: string;
};

export default function Button(props: props) {
    let button_styles = styles.primary;

    if (props.next) {
        button_styles += " " + styles.next;
    }

    if (props.queue) {
        button_styles += " " + styles.queue;
    }

    if (props.ghost) {
        button_styles += " " + styles.ghost;
    }

    if (props.dashed) {
        button_styles += " " + styles.dashed;
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
                    disabled={props.disabled}
					type={props.submit ? "submit" : "button"}
				>
					{props.children}
				</button>
			}
		</div>
    );
}