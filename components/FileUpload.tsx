"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const {
    env: {
        imagekit: { publicKey, urlEndpoint },
    },
} = config;

// Define interfaces for better type safety
interface AuthResponse {
    signature: string;
    expire: number;
    token: string;
}

interface UploadResponse {
    filePath: string;
    [key: string]: any;
}

interface UploadProgressEvent {
    loaded: number;
    total: number;
}

const authenticator = async (): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`,
            );
        }

        const data = await response.json();
        const { signature, expire, token } = data;

        return { token, expire, signature };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error(`Authentication request failed: ${errorMessage}`);
    }
};

interface Props {
    type: "image" | "video";
    accept: string;
    placeholder: string;
    folder: string;
    variant: "dark" | "light";
    onFileChange: (filePath: string) => void;
    value?: string;
}

const FileUpload = ({
    type,
    accept,
    placeholder,
    folder,
    variant,
    onFileChange,
    value,
}: Props) => {
    const ikUploadRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<{ filePath: string | null }>({
        filePath: value ?? null,
    });
    const [progress, setProgress] = useState(0);

    const styles = {
        button:
            variant === "dark"
                ? "bg-[#000000]"
                : "border-[#393E46] border-2 rounded-md",
        placeholder: variant === "dark" ? "text-gray-100" : "text-[#FE7743]",
        text: variant === "dark" ? "text-gray-100" : "text-[#FE7743]",
    };

    const onError = (error: unknown) => {
        console.error(error);

        toast(`${type} upload failed`, {
            description: `Your ${type} could not be uploaded. Please try again.`,
        });
    };

    const onSuccess = (res: UploadResponse) => {
        setFile(res);
        onFileChange(res.filePath);

        toast(`${type} uploaded successfully`, {
            description: `${res.filePath} uploaded successfully!`,
        });
    };

    const onValidate = (file: File): boolean => {
        if (type === "image") {
            if (file.size > 20 * 1024 * 1024) {
                toast("File size too large", {
                    description: "Please upload a file that is less than 20MB in size",
                });
                return false;
            }
        } else if (type === "video") {
            if (file.size > 50 * 1024 * 1024) {
                toast("File size too large", {
                    description: "Please upload a file that is less than 50MB in size",
                });
                return false;
            }
        }

        return true;
    };

    const handleUploadProgress = ({ loaded, total }: UploadProgressEvent) => {
        const percent = Math.round((loaded / total) * 100);
        setProgress(percent);
    };

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={() => setProgress(0)}
                onUploadProgress={handleUploadProgress}
                folder={folder}
                accept={accept}
                className="hidden"
            />

            <button
                className={cn("bg-[#FFFFFF]/85 cursor-pointer hover:border-[#FE7743] transition-all duration-300", styles.button)}
                onClick={(e) => {
                    e.preventDefault();

                    if (ikUploadRef.current) {
                        ikUploadRef.current.click();
                    }
                }}
            >
                <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

                {file.filePath && (
                    <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
                )}
            </button>

            {progress > 0 && progress !== 100 && (
                <div className="w-full rounded-full bg-green-200">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>
            )}

            {file.filePath &&
                (type === "image" ? (
                    <IKImage
                        alt={file.filePath}
                        path={file.filePath}
                        width={500}
                        height={300}
                    />
                ) : null)}
        </ImageKitProvider>
    );
};

export default FileUpload