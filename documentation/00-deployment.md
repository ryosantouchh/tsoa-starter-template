Run below script in terminal for deploy application using helm and create the new namespace
```bash
helm upgrade --install tsoa-poc charts/umbrella \
    -f environment/{folder}/values.yaml \
    -f environment/{folder}/secret.yaml \
    --namespace api-app-{folder}-namespace
    --create-namespace
```


K8s won't re-pull if the tag is the same and image is already cached. Force it via:
```base
kubectl rollout restart deployment/tsoa-poc-deploy -n api-app-{folder}-namespace
```
