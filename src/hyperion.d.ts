declare module 'hyperion' {
    import { Client } from "discord.js";

    export class HyperionClient extends Client {
        constructor(
            options?: {
                developers: string[]
            },
            HyperionOptions?: object
        );
    }
    export class BaseEvent {
        constructor(
            name: string,
            client: HyperionClient,
            entries: string | string[]
        );

        public manager: BaseCommand[];
        public prefix: string;
        public exec(): Function;
    }
    export class BaseCommand {
        constructor(
            name: string,
            options?: {
                locale?: string;
                alias?: string | string[];
                desc?: string;
                usage?: string | string[];
                dev?: boolean;
                mod?: boolean;
                activate?: boolean;
            }
        );
        
        public run(): Function;
    }
}