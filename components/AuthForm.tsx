import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontSize } from "../constants/tokens";

type Field = {
  placeholder: string;
  name: string;
  secureTextEntry?: boolean;
};

interface AuthFormProps {
  title: string;
  fields: Field[];
  buttonText: string;
  footerText?: string;
  footerLinkText?: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  onFooterPress?: () => void;
}

export default function AuthForm({
  title,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  onSubmit,
  onFooterPress,
}: AuthFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, ""])),
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      await onSubmit(values);
    } catch (e: any) {
      setError(e?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.inputcontainer}>
        {fields.map((f) => (
          <Input
            key={f.name}
            placeholder={f.placeholder}
            secureTextEntry={f.secureTextEntry}
            value={values[f.name]}
            onChangeText={(text) => handleChange(f.name, text)}
          />
        ))}
      </View>
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}

      <Button title={buttonText} onPress={handleSubmit} disabled={loading} />
      <View style={styles.footer}>
        {footerText && <Text style={styles.footerText}>{footerText}</Text>}

        {footerLinkText && (
          <TouchableOpacity onPress={onFooterPress}>
            <Text style={styles.footerLink}>{footerLinkText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputcontainer: {
    width: "100%",
    marginBottom: 20,
    gap: 20,
  },
  text: {
    fontSize: fontSize.xl,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  footer: {
    alignItems: "center",
    marginTop: 18,
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: fontSize.base,
  },
  footerLink: {
    color: "#688EFF",
    fontSize: fontSize.base,
    marginTop: 8,
  },
});
