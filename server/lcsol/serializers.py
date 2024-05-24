from rest_framework import serializers

class StringSerializer(serializers.Serializer):
    input_string = serializers.CharField()
    input_lang = serializers.CharField()

