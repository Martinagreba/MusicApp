import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontSize } from "../constants/tokens";

type Field = {
  placeholder: string;
  name: string;
  secureTextEntry?: boolean;
  rules?: object;
};

interface AuthFormProps {
  title: string;
  fields: Field[];
  buttonText: string;
  footerText?: string;
  footerLinkText?: string;
  control: any;
  errors: any;
  handleSubmit: (
    cb: (data: Record<string, string>) => Promise<void> | void,
  ) => () => void;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  onFooterPress?: () => void;
}

export default function AuthForm({
  title,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  control,
  errors,
  onSubmit,
  handleSubmit,
  onFooterPress,
}: AuthFormProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.inputcontainer}>
        {fields.map((f) => (
          <Controller
            key={f.name}
            control={control}
            name={f.name}
            render={({ field: { onChange, value } }) => (
              <View style={{ marginBottom: 10 }}>
                <Input
                  placeholder={f.placeholder}
                  secureTextEntry={f.secureTextEntry}
                  value={value}
                  onChangeText={onChange}
                  style={[
                    errors[f.name]
                      ? { borderWidth: 1, borderColor: "#ED3535" }
                      : {},
                  ]}
                />
                {errors[f.name] && (
                  <Text style={{ color: "#9B0101", marginTop: 5 }}>
                    {errors[f.name].message}
                  </Text>
                )}
              </View>
            )}
          />
        ))}
      </View>

      <Button title={buttonText} onPress={handleSubmit(onSubmit)} />
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
